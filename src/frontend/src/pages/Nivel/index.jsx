import { useState, useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Autocomplete, Row, Select} from 'react-materialize'
import { useLocation } from 'react-router-dom'

// Componentes
import Table from "../../components/Table"
import AddButton from "../../components/AddButton"
import NivelRowTable from "../../components/Nivel/NivelRowTable"

// Ferramentas
import { fetchAllNiveis } from "../../store/features/niveis/fetchAllNiveis"
import { ordenacaoByItem } from "../../services/tools/ordenacaoByItem"
import { searchByString } from "../../services/tools/searchByString"



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

// Função principal
const Nivel = () => {

    // Dados essenciais
    const dispatch = useDispatch()
    const niveisResponse = useSelector(state => state.niveis)
    const [data, setData] = useState(niveisResponse.value.data)
    const nivelNameList = getNameNiveis(niveisResponse.value.data)
    
    // Mundaças de estado da pagina
    const [searchNivel, setSearchNivel] = useState("")
    const [niveis, setNiveis] = useState([])
    const [selectOrdenacao, setSelectOrdenacao] = useState("nenhuma")
    const [selectFormaOrndenacao, setSelectFormaOrndenacao] = useState("crescente")


    // Atualizar data ao iniciar tela 
    useEffect(
        () => {
            Array(4).fill(0).forEach(() => dispatch(fetchAllNiveis()))
        },
        [window.location.pathname]
    )
    
    useEffect(
        () => {
            dispatch(fetchAllNiveis())
        },
        []
    )

    // Mudança de estado da tada
    useEffect(
        () => setData(niveisResponse.value.data),
        [niveisResponse]
    )

    // Preenchimento incial da lista
    useEffect(
        () => {
            setNiveis(data)
        },
        [data, window.location.pathname, niveisResponse]
    )

    // Ordenção da lista por topico em ordem crescente ou decrescente
    useEffect(
        () => {
            setNiveis(ordenacaoByItem(data, selectOrdenacao, selectFormaOrndenacao))
        },
        [selectOrdenacao, selectFormaOrndenacao]
    )

    // Ordenação da lista de acordo com a barra de pesquisa de nomes
    useEffect(
        () => {
            setNiveis(searchByString(data, searchNivel, "nivel"))
        },
        [searchNivel]
    )

    return (
        <div>
            <div className="container">
                <Row>
                    <h2>Niveis <AddButton /></h2>
                    
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
                        value={
                            searchNivel
                        }
                        onChange={
                            e => setSearchNivel(e.target.value)
                        }
                    />
                    <Select
                        id="select-nivel"
                        multiple={false}
                        label='Escolha ordenação'
                        onChange={
                            e => { 
                                setSelectOrdenacao(e.target.value)
                            }
                        }

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
                        <option disabled value="">
                            Escolha sua opção
                        </option>
                        <option value="nenhuma">
                            Nenhuma
                        </option>
                        <option value="nivel">
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
                        onChange={
                            e => {
                                setSelectFormaOrndenacao(e.target.value)
                            }
                        }
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
                    <NivelRowTable data={niveis} />
                </Table>
            </div>
            
        </div>
    )
}

export default Nivel
