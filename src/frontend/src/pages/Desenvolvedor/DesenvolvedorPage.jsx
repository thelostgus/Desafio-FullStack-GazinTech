import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Row } from "react-materialize"
import { useParams } from "react-router-dom"
import DesenvolvedorForm from "../../components/Desenvolvedor/DesenvolvedorForm"

import { fetchById } from "../../store/features/desenvolvedor/fetchById"

const DesenvolvedorPage = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const devResponse = useSelector(state => state.desenvolvedor)

    const [data, setData] = useState({})
    const [desenvolvedorForm, setDesevolvedorForm] = useState(<DesenvolvedorForm />)

    useEffect(
        () => Array(4).fill(0).map(() => dispatch(fetchById(id))),
        []
    )

    useEffect(
        () => {
            setData(devResponse.value.data)
        },
        [devResponse]
    )

    useEffect(
        () => {
            setDesevolvedorForm(
                <DesenvolvedorForm
                    data={data}
                />
            )
        },
        [data]
    )
    
    return (
        <div className="container">
            <Row>
                <h2>Desenvolvedor</h2>
            </Row>
                {
                    desenvolvedorForm
                }

        </div>
    )
}

export default DesenvolvedorPage
