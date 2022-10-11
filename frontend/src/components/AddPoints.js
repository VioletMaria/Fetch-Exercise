import { useState } from "react";
import { Link } from "react-router-dom";


const AddPoints = (props) => {
    const {initialPoints, onSubmitProp} = props;
    const [points, setPoints] = useState(initialPoints);

    const onSubmitHandler = e => {
      //prevent default behavior of the submit
      e.preventDefault();
      onSubmitProp({points})
  }

    return (
        <div>
            <form className="form" onSubmit={onSubmitHandler}>
                <input type="number" onChange={(e)=>setPoints(e.target.value)} value={points} />
                <input className="btn-text" type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default AddPoints;