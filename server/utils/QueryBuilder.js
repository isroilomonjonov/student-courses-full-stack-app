const {Op} = require("sequelize");

const excludeParams = ["page", "size", "fields", "search", "sort"];
const operators = ["gte", "gt", "lt", "lte", "in"]

class QueryBuilder {
    constructor(queryParams){
     this.queryParams = queryParams;
     this.queryOptions = {}
    }

    filter(){
     const filterFields = {...this.queryParams}
     excludeParams.forEach(p=>delete filterFields[p])
     const filterObject = {};
     Object.keys(filterFields).forEach(k=>{
        const filterItem = filterFields[k]
        if(typeof filterItem === "object"){
            Object.keys(filterItem).forEach((ik)=>{
               if(Object.keys(filterFields[k]).length>1){
               if(filterObject[k]){
                filterObject[k] = {...{[Op[ik]]: filterItem[ik]},...filterObject[k]}
               }else{
                 filterObject[k]={[Op[ik]]: filterItem[ik]}
               }
                return
            }
            if(Object.keys(filterFields[k])[0]==="in"){
                filterObject[k] = {[Op[ik]]: filterItem[ik].split(",")}
               return
             }
                if(operators.includes(ik)){
                    filterObject[k] = {[Op[ik]]: filterItem[ik]}
                }
        })
        }else{
            filterObject[k] = {[Op.eq]: filterItem}
        }
     })

     if(this.queryOptions.where){
        this.queryOptions.where =  {...filterObject, ...this.queryOptions.where};
        
     }else{
        this.queryOptions.where = filterObject;
     }
     return this;
    }

    limitFields(){
       if(this.queryParams.fields?.length>0){ 
               const attributes = this.queryParams.fields?.split(",")
         const newATTRIBUTE =attributes.filter(field => field!=="")
        if(newATTRIBUTE.length>0){
        this.queryOptions.attributes = newATTRIBUTE
       }
        
    }else{
        console.error("There is no fields property")
    }
    return this
    }

    paginate(){
        const page = this.queryParams.page  || 1 ;
        const limit = this.queryParams.size || 100;
        this.queryOptions.limit = limit;
        this.queryOptions.offset = (page-1) * limit;
        return this;
    }

    search(searchFields){
        if(!this.queryParams.search)return this;

        const searchObj = { 
                [Op.or]: 
                     searchFields.map(field=> ({[field]:{[Op.iLike]:`%${this.queryParams.search}%`}}))
               }

        if(this.queryOptions.where){
            this.queryOptions.where = {...searchObj, ...this.queryOptions.where}

        }else{
            this.queryOptions.where = searchObj
        }   
            return this
    }


    createPage(queryResult){
        if(!queryResult.count&&!queryResult.rows)return queryResult;


        const allPagesCount = Math.ceil(queryResult.count / this.queryOptions.limit)
        const page = +this.queryParams.page;
        const isLastPage =allPagesCount === page;
        return {
            content:  queryResult.rows,
            pagination: {
                allItemsCount: queryResult.count,
                page,
                allPagesCount,
                isFirstPage: page === 1,
                isLastPage ,
                pageSize: this.queryOptions.size
            }
        }
    

    }

    #createOrderArray(){
        const orderArr = this.queryParams.sort.split(",").map((i)=>{
            const orderItem = [];
            const isDesc = i.startsWith("-")

            orderItem[0] = isDesc ? i.slice(1) : i
            orderItem[1] = isDesc ? "desc" : "asc"

            return orderItem

        })
        return orderArr
    }

    sort(){
        if(this.queryParams.sort)
            this.queryOptions.order = this.#createOrderArray()
        else{
            this.queryOptions.order = [["createdAt", "desc"]]
        }
        return this;
    }
}

module.exports = QueryBuilder