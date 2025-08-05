import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputMask from "react-input-mask";
import { IMaskInput } from "react-imask";

// Schema de validação
const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  telefone: yup
    .string()
    .required("Telefone é obrigatório")
    .matches(/\(\d{2}\) \d{4,5}-\d{4}/, "Telefone inválido"),
  senha: yup.string().required("Senha é obrigatória").min(6, "Mínimo 6 caracteres"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas devem ser iguais")
    .required("Confirme sua senha")
});

function App() {
  const [sucesso, setSucesso] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Usuário cadastrado:", data);
    setSucesso(true);
    reset();
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>Cadastro de Usuário</h2>

      {sucesso && (
        <div style={{ color: "green", marginBottom: 20 }}>
          ✅ Usuário cadastrado com sucesso!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: 15 }}>
          <label>Nome:</label>
          <input type="text" {...register("nome")} />
          <p style={{ color: "red" }}>{errors.nome?.message}</p>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>E-mail:</label>
          <input type="email" {...register("email")} />
          <p style={{ color: "red" }}>{errors.email?.message}</p>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Telefone:</label>
          <Controller
            name="telefone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="(00) 00000-0000"
                placeholder="(99) 99999-9999"
                onAccept={(value) => field.onChange(value)}
              />
            )}
          />
          <p style={{ color: "red" }}>{errors.telefone?.message}</p>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Senha:</label>
          <input type="password" {...register("senha")} />
          <p style={{ color: "red" }}>{errors.senha?.message}</p>
        </div>

        <div style={{ marginBottom: 15 }}>
          <label>Confirmar Senha:</label>
          <input type="password" {...register("confirmarSenha")} />
          <p style={{ color: "red" }}>{errors.confirmarSenha?.message}</p>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
