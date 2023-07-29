import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import InnerFields from "./InnerField";
import Input from "../../../components/Input/Input";

export default function Fields({ register, control,styles }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <>
        {fields.map((item, index) => (
          <div key={item.id}>
            <div>
            <Input className={`${styles.questionI}`} register={register.bind(null,`questions.${index}.question`)} placeholder={`Savol ${index+1}`} />
            </div>
            <InnerFields register={register} control={control} indexO={index} styles={styles}/>
            <button className="deleteBTN" type="button" onClick={() => remove(index)}>
              Savolni o'chirish
            </button>
          </div>
        ))}
      <button
        type="button"
        className="appendBTN"
        onClick={() => append({ question:""})}
      >
        Savol qo'shish
      </button>
    </>
  );
}
