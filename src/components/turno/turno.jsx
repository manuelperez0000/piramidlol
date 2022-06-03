const Turno = ({turno}) => {
    return (<>
        {turno && <div className="turno">
            No es tu turno
        </div>
        }
    </>
    )
}
export default Turno