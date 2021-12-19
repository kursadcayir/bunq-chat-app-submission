
import './loginItem.css';



const LoginItem = ({ users , handleClick} ) => {

    
return  (

    users.map(user => {
        return (
            <div className='user-item' key={user.id} data-testid={user.name+user.id} onClick={() => handleClick(user)}>
                <p>{user.name}</p>
            </div>
        )
    })
    
);

}
export default LoginItem;