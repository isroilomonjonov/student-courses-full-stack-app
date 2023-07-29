import React, { useEffect } from "react";
import styles from "./AddEditQuiz.module.css";
import Fields from "./Fields";
import Layout from "../../../components/Layout/Layout";
import { useForm } from "react-hook-form";
import Input from "../../../components/Input/Input";
import { submit, testById } from "../../../api/tests-api";
import useHttp from './../../../hooks/use-http';
import { useNavigate, useParams } from "react-router-dom";
const AddEditQuiz = () => {
  const params = useParams();
  const path=window.location.pathname
  const navigate = useNavigate();
  const isUpdate = params.id !== "new";
  const { register, control, handleSubmit, reset, trigger, setError } = useForm()
  const { send: formSubmit } = useHttp(submit);
  const { send: getTestById } = useHttp(testById);

  useEffect(() => {
    if (isUpdate) {
      getTestById({ id: params.id, reset });
    }
  }, [path]);
  return (
    <Layout>
      <form className={`${styles.form}`} onSubmit={handleSubmit((data) => formSubmit({ data, id: params.id, navigate,isUpdate,courseId:params.courseId}))}>
        <Input type="text" placeholder="Test nomi"  register={register.bind(null,`name`)}/>
        <Fields register={register} control={control} styles={styles} />
        <button  className="button-23">Submit</button>
      </form>
    </Layout>
  );
};

export default AddEditQuiz;
