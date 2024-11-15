import ReactLoading from 'react-loading';
import './loader.css';

function Loader() {
    return(
        <div className="loader">
            <ReactLoading
                type={"bars"}
                color={"#FFD900"}
                heigth={100}
                width={100}
            />
        </div>
    );
}

export default Loader;
