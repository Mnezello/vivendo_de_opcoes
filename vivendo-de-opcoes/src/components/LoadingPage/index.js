import ReactLoading from 'react-loading';
import './loadingPage.css';

function LoadingPage() {
    return(
        <div className="loading-page">
            <ReactLoading
                type={"bars"}
                color={"#FFD900"}
                heigth={100}
                width={100}
            />
        </div>
    );
}

export default LoadingPage;