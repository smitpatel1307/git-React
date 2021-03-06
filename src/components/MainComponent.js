import React,{Component} from 'react';
import About from './AboutComponent';
import Menu from './Menucomponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import DishdetailComponent from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
/*import {DISHES} from '../shared/dishes';
import {LEADERS} from '../shared/leaders';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';*/
import {addComment} from '../redux/ActionCreators';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


const mapStateToProps = state =>{
    return{
      dishes:state.dishes,
      comment:state.comment,
      promotions:state.promotions,
      leaders:state.leaders
    }
}
const mapDispatchToProps = (dispatch) =>({
  addComment:(dishId,rating,author,comment) =>dispatch(addComment(dishId,rating,author,comment))
})
class Main extends Component {

  constructor(props){
    super(props);
   /* this.state={
      dishes:DISHES,
      selectedDish:null,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };*/
  }
 
 

  render() {
      const HomePage=()=>{
          return(
              <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
              />
          );
      }
      const DishWithId = ({match}) => {
        return(
            <DishdetailComponent dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
              addComment={this.props.addComment}/>
        );
      };
    return (
      <div>
        <Header />
        <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}/>}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path="/contactus" component={Contact} />
            <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
            <Redirect to="/home" />
        </Switch>
        
        <Footer />
      </div>
    );
  }
}
/*export default Main;*/
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
