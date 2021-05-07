import React from "react";

const Form = ({ data: atividade, modulos, handleChange, handleSubmit, handleLimpar }) => {
    return (
        <>
            <form className="my-5 text-left" onSubmit={handleSubmit}>
                <div className="tab-pane active" id="tabAtividade" role="tabpanel">
                    <div className="row">
                        <div className="form-group col-md-2">
                            <label htmlFor="id">ID:</label>
                            <input className="form-control" type="text" name="id" id="id" value={atividade.id} readOnly 
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-10"></div>
                        <div className="form-group col-md-6">
                            <label htmlFor="descricao">Descrição:</label>
                            <input className="form-control" type="text" name="descricao" id="descricao" value={atividade.descricao} 
                            onChange={handleChange} />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="modulo">Módulo:</label>
                            <select name="chEsModulo" className="form-control" value={atividade.chEsModulo}>
                                {modulos.map((modulo) => {
                                    return (<option key={modulo.id} value={modulo.id}>{modulo.modulo}</option>)
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            <label>Tipo:</label>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="idTipoTrabalho" name="idTipo" value="0"
                                onChange={handleChange} autoComplete="off" />
                                <label className="custom-control-label" htmlFor="idTipoTrabalho">Trabalho</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="idTipoProva" name="idTipo" value="1"
                                onChange={handleChange} autoComplete="off" />
                                <label className="custom-control-label" htmlFor="idTipoProva">Prova</label>
                            </div>
                            <div className="custom-control custom-radio">
                                <input type="radio" className="custom-control-input" id="idTipoRecuperacao" name="idTipo" value="1"
                                onChange={handleChange} autoComplete="off" />
                                <label className="custom-control-label" htmlFor="idTipoRecuperacao">Recuperação</label>
                            </div>
                        </div>
                        <div className="form-group col-md-2">
                            <label htmlFor="data">Data:</label>
                            <input className="form-control" type="date" name="data" id="data" value={atividade.data} 
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