import { useState, useEffect, useCallback } from "react";

 const Bitacora = () => {
    const [bitacora, setBitacora] = useState([]);

    const getBitacora = useCallback(async () => {
        const bitacora = await (await fetch("")).json();
        return bitacora;
    }, []);

    useEffect(() => {
        (async () => {
            const bitacora = await getBitacora();
            setBitacora(bitacora);
        })();
    }, []);

    return (
        <>
            <div>
        ajdklajl
            </div>
        </>
    );
}

export default Bitacora;