import './backToTop.css';
import '../../responsive.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

function BackToTop() {

    const activeBackToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div className="back-to-top" id="back-to-top">
            <FontAwesomeIcon icon={faChevronCircleUp} size="2x" onClick={activeBackToTop}/>
        </div>
    );
}

export default BackToTop;
