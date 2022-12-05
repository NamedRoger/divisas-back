import { useCallback } from "react";
import { useState, useEffect } from "react";

const Movimientos = () => {

    const [movimientos, setMovimientos] = useState([]);
    const [mov, setMov] = useState({
        id: "",
        tipoMovimiento: "",
        cantidadDolares: 0,
        precioUnitario: 0,
        pago: 0,
        cambio: 0,
    });

    const getMovimienitos = useCallback(async () => {
        const movimientos = await (await fetch("https://localhost:7107/movimiento")).json();
        return movimientos;
    }, []);

    const registrar = useCallback(async (values) => {
        await fetch("https://localhost:7107/movimiento", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
                "Content-Type": "application/json",
            } 
        });
    });

    useEffect(() => {
        (async () => {
            const mov = await getMovimienitos();
            setMovimientos(mov);
        })();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        (async () => {
            registrar({
                ...mov
            });
        })();
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        const state = mov;

        setMov(
            {
                ...state,
                [name]: value,
            }
        );
    };


    return (
        <>
            <div>
                <div>
                    <form onSubmit={submit}>
                        <select name="tipoMovimiento" value={mov.tipoMovimiento} onChange={handleChange}>
                            <option value={"VENTA"}>VENTA</option>
                            <option value={"CAMBIO"}>CAMBIO</option>
                        </select>
                        <input type={"number"} name="cantidadDolares" value={mov.cantidadDolares} onChange={handleChange} />
                        <input type={"number"} name="precioUnitario" value={mov.precioUnitario} onChange={handleChange} />
                        <input type={"number"} name="pago" value={mov.pago} onChange={handleChange} />
                        <input type={"number"} name="cambio" value={mov.cambio} onChange={handleChange} />

                        <button type="submit">
                            registrar
                        </button>
                    </form>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>id</td>
                                <td>tipo</td>
                                <td>dolares</td>
                                <td>precio</td>
                                <td>pago</td>
                                <td>cambio</td>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map(m => (
                                <tr>
                                    <td>{m.id}</td>
                                    <td>{m.tipoMovimiento}</td>
                                    <td>$ {m.cantidadDolares}</td>
                                    <td>$ {m.precioUnitario}</td>
                                    <td>$ {m.costoTotal}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Movimientos;