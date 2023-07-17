import React, { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    const [loading, setLoading] = useState(true);
    const [color, setColor] = useState("#ffffff");

    return (
        <div style={{marginTop: '150px'}}>
            <div className="sweet-loading text-center">
                <HashLoader color="black" loading={loading} size={80} />
            </div>
        </div>
    );
}

export default Loader;
