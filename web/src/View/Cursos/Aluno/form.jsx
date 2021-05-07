import React from "react";
import Autocomplete from "../../../componentes/Autocomplete";

const Form = ({ data: aluno, sugestaoSelecionada, sugestoes, handleChange, handleSubmit, handleLimpar }) => {
    return (
        <>
            <form className="my-5 text-left" onSubmit={handleSubmit}>
                <div className="tab-pane active" id="tabAluno" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="id">ID:</label>
                            <input className="form-control" type="text" name="id" id="id" value={aluno.id} readOnly 
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-10"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <Autocomplete className="form-control col-md-12" onClick={sugestaoSelecionada} field="nome" 
                            suggestions={sugestoes} value={aluno.nome} name="nome" id="nome" onChange={handleChange} autoComplete="no" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">E-mail:</label>
                            <input className="form-control" type="text" name="email" id="email" value={aluno.email} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="rg">RG:</label>
                            <input className="form-control" type="text" name="rg" id="rg" value={aluno.rg} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="telefone">Telefone:</label>
                            <input className="form-control" type="text" name="telefone" id="telefone" value={aluno.telefone} 
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="endereco">Endereço:</label>
                            <input className="form-control" type="text" name="endereco" id="endereco" value={aluno.endereco} 
                            onChange={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="botoes">
                    <hr className="bg-white" />
                    <div className="row">
                        <div className="col-md-2">
                            <button className="btn btn-success btn-lg btn-block" type="submit">Salvar</button> 
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-lg btn-block" type="button" onClick={handleLimpar} >Limpar</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Form;