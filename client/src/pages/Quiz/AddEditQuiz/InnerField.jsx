import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Input from "../../../components/Input/Input";

export default function InnerFields({ register, control, indexO, styles }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${indexO}.answers`,
  });

  return (
    <>
      {fields.map((item, index) => (
        <div className={styles.flex} key={item.id}>
          <input
            style={{ zoom: "2", marginLeft: "50px" }}
            type="checkbox"
            id={`questions.${indexO}.answers`}
            {...register(`questions.${indexO}.answers.${index}.isTrue`)}
          />
          <Input
            type="text"
            placeholder={`Javob ${index + 1}`}
            register={register.bind(null,`questions.${indexO}.answers.${index}.text`)}
          />
          <button className="deleteBTN"type="button" onClick={() => remove(index)}>
           O'chirish
          </button>
        </div>
      ))}
      <button type="button" className="appendBTN" onClick={() => append({ text: "" })}>
        Javob qo'shish
      </button>
    </>
  );
}
