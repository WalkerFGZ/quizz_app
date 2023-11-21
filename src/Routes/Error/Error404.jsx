import { Link } from 'react-router-dom';

const Error404 = () => {
    return (
        <div>
            <h1>404 Error</h1>
            <p>Page not found</p>
            <Link to="/">Go back to home</Link>
        </div>
    )
}

export default Error404