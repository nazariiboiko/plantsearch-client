import { Link } from 'react-router-dom';
import './Plant.css';

const PlantList = ( {response, title, text} ) => {

    return (
        <div className='row plant-shadow'>
        <div className='plant-text-section'>
          <div className='plant-title'>{title}</div>
          <div className='plant-text'>{text}</div>
        </div>
        {console.info(response)}

        {
            response?.data?.map((plant) => {
                return (
                    <div className="col-md-2 plant-card" key={plant.id}>
                      <a>
                      <Link to={`/plant/${plant.id}`}>
                        <img className='d-block show-image' src={`https://plantsearch.s3.eu-north-1.amazonaws.com/images/${plant.image}`} alt="plant"/>
                          <p className='text-center'>{plant?.name?.length > 21 ? plant.name.slice(0, 21) + '...' : plant.name}</p>
                          <div className="overlay"></div>
                      </Link>
                      </a>
                    </div>
            
                );
            })
        }
      </div>
    );
};

export default PlantList;