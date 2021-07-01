import React, { Fragment } from 'react'
import { Link, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import  Search  from './Search';
import { logout } from './../actions/UserActions';





const Header = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { user, loading } = useSelector(state => state.auth)
    const { cartItems } = useSelector(state => state.cart)
    const logoutHandler =() =>{
      dispatch(logout());
      alert.success('Logged out successfully');
    }


  return (
    <Fragment>
      <nav className="header">
        <Link to="/">
            <img className="header_logo"src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
        </Link>
        
        <Route render={({ history}) =><Search history={history} />}/>
      

      <div className="header_nav">
  
               { user ? (
                <div className="ml-1 dropdown d-inline">
                  <Link to="!#"  className="btn dropdown-toggle text-white" type="button"
                  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"aria-expanded="false">
                    <figure className="avatar avatar-nav">
                      <img src={user.avatar && user.avatar.url}
                      alt={user && user.firstName}
                      className="rounded-circle"
                      />
                    </figure>
                    <span className="ml-2">{user && user.firstName}</span>
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">

                  { user && user.role !=='admin' ?(
                     <Link className="dropdown-item" to="/orders/me"> Orders</Link>

                    

                    ): (
                      <Link className="dropdown-item" to="/dashboard"> Dashboard</Link>

                    )
                  
                  }
                        <Link className="dropdown-item" to="/me"> Profile</Link>
                        <Link className="dropdown-item" to="/"  onClick={logoutHandler}> Logout</Link>

                   </div>

                   

                </div> 
                
              ): !loading &&
            
                  <Link to ="/login" className="header_link">
                        <div className="header_options">
                          <span className="header_optionLineOne">Hello, Guest</span>
                          <span className="header_optionLineTwo">
                            Sign In 
                          </span>
                        </div>
                  </Link>
              }    
            

            <Link to="/register" className="header_link">
              <div className="header_options">
                  <span className="header_optionLineOne">Create</span>
                  <span  className="header_optionLineTwo" >Account</span>

              </div>


            </Link>
            <Link to="/order/return" className="header_link">
              <div className="header_options">
                  <span className="header_optionLineOne">Return</span>
                  <span  className="header_optionLineTwo" > & Orders</span>

              </div>


            </Link>
               

        <Link className="header_link">
            <div className="header_options">
                <span  className="header_optionLineOne">Your</span>
                <span  className="header_optionLineTwo">Prime</span>

            </div>
        </Link>
      

        <Link to="/cart" className="header_link">
            <div className="header_optionsBasket">
                <ShoppingBasketIcon className="shopping_basket"/>
                <span  className="header_optionLineTwo header header_basketCount">
                 {cartItems.length}
                </span>
              
                
            </div>
    
        </Link>


      </div>
      

    </nav>
 

    </Fragment>

)
}

export default Header;
