import { FcExpand, FcSearch } from 'react-icons/fc';
import { MdExpandMore } from 'react-icons/md';
import { RxReset } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import Card from '../Card';
import { Button, Collapse } from 'react-bootstrap';

const Home = () => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [originalLaunchOpen, setOriginalLaunchOpen] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [statusQuery, setStatusQuery] = useState('');
  const [originalLaunchQuery, setOriginalLaunchQuery] = useState('');
  const [typeQuery, setTypeQuery] = useState('');
  const [typeChecks, setTypeChecks] = useState([]);
  const [statusChecks, setStatusChecks] = useState([]);
  const [originalLaunchChecks, setOriginalLaunchChecks] = useState([]);

  const resultsSection = document.getElementById('resultsSection');

  useEffect(() => {
    if (data.length > 0) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  const onClickScroll = () => {
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const queryUrl = `https://api.spacexdata.com/v3/capsules?status=${statusQuery}&original_launch=${originalLaunchQuery}&type=${typeQuery}`;
    axios
      .get(queryUrl)
      .then((res) => {
        const typeData = [];
        const statusData = [];
        const originalLaunchData = [];
        if (res.status === 200) {
          setData(res.data);
          res.data.map((eachData) => {
            if (typeData.includes(eachData.type) === false && eachData.type !== null) {
              typeData.push(eachData.type);
            }
            if (statusData.includes(eachData.status) === false && eachData.status !== null) {
              statusData.push(eachData.status);
            }
            if (
              originalLaunchData.includes(eachData.original_launch) === false &&
              eachData.original_launch !== null
            ) {
              originalLaunchData.push(eachData.original_launch);
            }
          });
        }

        setTypeChecks(typeData);
        setStatusChecks(statusData);
        setOriginalLaunchChecks(originalLaunchData);
      })
      .catch((err) => setError(err.message));
  }, [statusQuery, originalLaunchQuery, typeQuery]);

  const onChangeQuery = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'status') {
      setStatusQuery(value);
    }
    if (name === 'originalLaunch') {
      setOriginalLaunchQuery(value);
    }
    if (name === 'type') {
      setTypeQuery(value);
    }
  };

  const onClickReset = () => {
    setOriginalLaunchOpen(false);
    setTypeOpen(false);
    setStatusOpen(false);

    setStatusQuery('');
    setOriginalLaunchQuery('');
    setTypeQuery('');
  };

  return (
    <>
      {error !== '' ? (
        <h1>error</h1>
      ) : (
        <>
          <div
            style={{
              backgroundImage: `url(https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/iss059e043282.jpg)`,
              height: '100vh',
              width: '100vw',
              backgroundSize: 'cover'
            }}>
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ height: '80%' }}>
              <h1 className="text-white">Search Capsules</h1>
              <h4 className="text-white">Diligent Search, Built For You</h4>
              <div className="d-flex flex-column align-items-center mt-4 w-100">
                <div className="d-flex flex-column align-items-center gap-2 w-100">
                  <div className="d-flex flex-column align-items-center gap-2 w-100">
                    <div className="input-group flex-nowrap input-bar">
                      <input
                        onChange={onChangeQuery}
                        name="status"
                        type="text"
                        className="form-control"
                        placeholder="active"
                        value={statusQuery}
                      />
                      <Button
                        className="input-group-text"
                        onClick={() => setStatusOpen((prev) => !prev)}
                        aria-controls="example-collapse-text"
                        aria-expanded={statusOpen}>
                        <MdExpandMore fill="white" size={30} />
                      </Button>
                    </div>

                    <Collapse in={statusOpen}>
                      <div id="example-collapse-text">
                        <ul className="m-0 p-1 d-flex gap-2 flex-wrap justify-content-center">
                          {statusChecks.map((eachStatus, index) => (
                            <li
                              onClick={() => setStatusQuery(eachStatus)}
                              className="button-29 flex justify-content-center align-items-center gap-2"
                              key={index}>
                              <FcSearch />
                              {eachStatus}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2 w-100">
                    <div className="input-group flex-nowrap input-bar">
                      <input
                        onChange={onChangeQuery}
                        name="originalLaunch"
                        type="text"
                        className="form-control"
                        placeholder="2017-07-05T23:35:00.000Z"
                        value={originalLaunchQuery}
                      />
                      <Button
                        className="input-group-text"
                        onClick={() => setOriginalLaunchOpen((prev) => !prev)}
                        aria-controls="example-collapse-text"
                        aria-expanded={originalLaunchOpen}>
                        <MdExpandMore fill="white" size={30} />
                      </Button>
                    </div>
                    <Collapse in={originalLaunchOpen}>
                      <div
                        id="example-collapse-text d-flex justify-content-center"
                        style={{ width: '60%' }}>
                        <ul className="m-0 p-1 d-flex gap-2 flex-wrap justify-content-center">
                          {originalLaunchChecks.map((eachStatus, index) => (
                            <li
                              onClick={() => setOriginalLaunchQuery(eachStatus)}
                              className="button-29 flex justify-content-center align-items-center gap-2"
                              key={index}>
                              <FcSearch />
                              {eachStatus}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>

                  <div className="d-flex flex-column align-items-center gap-2 w-100">
                    <div className="input-group flex-nowrap input-bar">
                      <input
                        onChange={onChangeQuery}
                        name="type"
                        type="text"
                        className="form-control"
                        placeholder="Dragon 1.1"
                        value={typeQuery}
                      />
                      <Button
                        className="input-group-text"
                        onClick={() => setTypeOpen((prev) => !prev)}
                        aria-controls="example-collapse-text"
                        aria-expanded={typeOpen}>
                        <MdExpandMore fill="white" size={30} />
                      </Button>
                    </div>
                    <Collapse in={typeOpen}>
                      <div id="example-collapse-text w-75">
                        <ul className="m-0 p-1 d-flex gap-2 flex-wrap justify-content-center">
                          {typeChecks.map((eachStatus, index) => (
                            <li
                              onClick={() => setTypeQuery(eachStatus)}
                              className="button-29 flex justify-content-center align-items-center gap-2"
                              key={index}>
                              <FcSearch />
                              {eachStatus}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </div>
                <div>
                  <button className="m-2 py-0 px-4 btn btn-light">
                    <RxReset
                      onClick={onClickReset}
                      className="text-primary"
                      style={{ fontSize: '20px' }}
                    />
                  </button>
                </div>
                <h2 className="text-white mt-5">
                  {data.length === 0 ? 'No results found!' : `${data.length} results found!`}
                </h2>
                <div>
                  <FcExpand size={40} onClick={onClickScroll} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div id="resultsSection" className="card-container" style={{ padding: '5% 0' }}>
              <h1 className="text-white text-center">Capsules</h1>
              <ul
                className="mx-auto d-flex justify-content-start flex-wrap gap-4"
                style={{ padding: '5% 1%' }}>
                {data.map((eachData, index) => (
                  <Card data={eachData} key={index} />
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
