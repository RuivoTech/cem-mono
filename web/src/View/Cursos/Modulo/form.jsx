import React from "react";

const Form = ({ data: modulo, handleChange, handleLimpar }) => {
    return (
        <>
            <ul className="nav nav-tabs" role="tablist">
                <li className="nav-item">
                    <a className="nav-link active formulario" href="#tabModulo" role="tab" data-toggle="tab">Módulo</a>
                </li>
            </ul>

            <form className="tab-content text-left">
                <input type="hidden" id="id" name="id" />
                <div className="tab-pane active" id="tabModulo" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="nome">Nome:</label>
                            <input className="form-control" id="nome" name="nome" type="text" value={modulo.nome} required
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6"></div>
                        <div className="form-group col-md-8">
                            <label htmlFor="descricao">Descrição:</label>
                            <textarea className="form-control" name="descricao" id="descricao" value={modulo.descricao} rows="10"
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