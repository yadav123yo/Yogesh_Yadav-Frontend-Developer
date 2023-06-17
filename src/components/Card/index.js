import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css';
import rocket from '../../assets/icons/rocket.svg';
import { useState } from 'react';

const Card = (props) => {
  const { data } = props;

  const [show, setShow] = useState(false);

  const onClickReadMore = () => {
    setShow((prev) => !prev);
  };

  const ModalComponent = () => {
    return (
      <Modal
        style={{
          backgroundImage: `url(https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/iss059e043282.jpg)`,
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover'
        }}
        show={show}
        onHide={onClickReadMore}
        centered>
        <Modal.Header>
          <Modal.Title>{data.capsule_serial}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{data.details}</h6>
          <ul className="m-0 p-0">
            <h6 className="m-0">Missions Details : </h6>
            {data.missions.length === 0 && "Mission details aren't available at the moment!"}
            {data.missions.length !== 0 &&
              data.missions.map((eachMission, index) => (
                <div className="d-flex gap-4" key={index}>
                  <li style={{ listStyle: 'disc', marginLeft: '24px' }}>
                    Name : {eachMission.name}
                  </li>
                  <li style={{ listStyle: 'disc', marginLeft: '24px' }}>
                    Flight : {eachMission.flight}
                  </li>
                </div>
              ))}
          </ul>
          <h6>Capsule ID : {data.capsule_id}</h6>
          <h6>Landings : {data.landings}</h6>
          <h6>Original Launch : {data.original_launch}</h6>
          <h6>Original Launch UNIX : {data.original_launch_unix}</h6>
          <h6>Reuse Count : {data.reuse_count}</h6>
          <h6>Status : {data.status}</h6>
          <h6>Type : {data.type}</h6>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClickReadMore}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      {show && <ModalComponent />}

      <li className="mx-auto my-2" onClick={onClickReadMore}>
        <div className="container">
          <div className="card">
            <div className="imgBx">
              <img src={rocket} alt="rocket" style={{ width: '130px' }} />
            </div>

            <div className="contentBx">
              <h2>{data.capsule_serial}</h2>

              <div>
                <h4 className="size text-white">
                  {data.details === null
                    ? 'No Details Available'
                    : data.details.length > 40
                    ? data.details.slice(0, 40) + '...'
                    : data.details}
                </h4>
              </div>

              <Button variant="primary" onClick={() => onClickReadMore}>
                Read More
              </Button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Card;
