import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Autocomplete, Row, Select} from 'react-materialize'

// Componentes
import Table from "../../components/Table"
import Acoes from "../../components/Acoes"
import AddButton from "../../components/AddButton"

// Ferramentas
import { atualizarNiveis } from"../../store/actions/nivel"


const gerenciarDados = data => {
    if (data.length > 0){
        return (
            data.map((item, index) => (
                <tr key={index}>
                    <td>
                        {item.nivel}
                    </td>
                    <td>
                        {item.numeroDevs}
                    </td>
                    <td>
                        <Acoes
                            id={item.id}
                            modalView={
                                <div className="container">
                                    <h5><strong>Nome:</strong> {item.nivel}</h5>
                                    <h5><strong>Numero de desenvolvedores que são deste nivel:</strong> {item.numeroDevs}</h5>
                                </div>
                            }
                            blockDeleteButton={ item.numeroDevs > 0 }
                        />
                    </td>
                </tr>
            ))
        )
    }else{
        return (
            <tr>
                <td>
                    Não há dados
                </td>
            </tr>
        )
    }
}

// Função principal
const Nivel = ({ niveis, nivelNameList}) => {
    return (
        <div>
            <div className="container">
                <Row>
                    <h2>Niveis</h2>
                </Row>
                <Row>
                    <Autocomplete
                        id="search-dev"
                        options={{
                            data: nivelNameList
                        }}
                        placeholder="Escreva aqui"
                        title='Procurar nivel'
                        s={8}
                    />
                    <Select
                        id="select-nivel"
                        multiple={false}
                        label='Escolha ordenação'
                        onChange={function noRefCheck() { }}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        s={2}
                    >
                        <option
                            disabled
                            value=""
                        >
                            Escolha sua opção
                        </option>
                        <option value="nenhuma">
                            Nenhuma
                        </option>
                        <option value="nome">
                            Nome
                        </option>
                        <option value="numeroDevs">
                            Numero devs
                        </option>
                    </Select>
                    <Select
                        id="select-ordem"
                        multiple={false}
                        label='Escolha a forma'
                        onChange={function noRefCheck() { }}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        s={2}
                    >
                        <option value="crescente">
                            Crescente
                        </option>
                        <option value="decrescente">
                            Decrescente
                        </option>
                    </Select>
                </Row>

                <Table heads={["Nome", "Numero de desenvolvedores"]}>
                    {
                        gerenciarDados(niveis)
                    }
                </Table>
            </div>
            <AddButton />
        </div>
    )
}

const getNameNiveis = data => {
    if (data.length === 0) return {}

    // Niveis final list
    const niveis = {}

    data.map(
        (item, index) => {
            niveis[item.nivel] = null
        }
    )

    return niveis
}

const mapStateToProps = state => {
    const {niveis} = state
    const data = typeof niveis.data === 'undefined' ? [] : niveis.data
    const nivelNameList = getNameNiveis(data)

    return {
        niveis: data,
        nivelNameList: nivelNameList,
        status: niveis.status
    }
}

const mapDispatchToProp = dispatch => (
    bindActionCreators(
        atualizarNiveis(dispatch),
        dispatch
    )
)

export default connect(
        mapStateToProps,
        mapDispatchToProp
    )(Nivel)
