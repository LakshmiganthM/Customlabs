import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { LeftOutlined, MinusOutlined } from '@ant-design/icons'
import Badge from 'react-bootstrap/Badge'
import Form from 'react-bootstrap/Form'
import './style.css'
const Main = () => {
  const [show, setShow] = useState(false)
  const [change, setchange] = useState()
  console.log(change)
  const [segment, setSegment] = useState({
    segment_name: '',
    schema: [],
  })
  const dataSubmit = async () => {
    if (
      !segment.segment_name ||
      segment.segment_name === '' ||
      segment.segment_name === null
    ) {
      alert('Enter a Segment Name')
    } else if (segment.schema.length === 0) {
      alert('Select atleast one schema and then proceed')
    } else {
      axios
        .post(
          'http://webhook.site/d64f575b-1d94-4665-9368-831e285de3e7',
          segment,
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(function (response) {
          if (response.status === 200) {
            alert('Success')
            window.location.reload()
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }

  const segmentchange = (e) => {
    let temp = { ...segment, segment_name: e.target.value }
    setSegment(temp)
  }
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const main = {
    backgroundColor: 'darkturquoise',
    display: 'flex',
    alignItems: 'center',
    padding: '25px 20px',
    justifycontent: 'initial',
  }

  const bodyelement = {
    padding: '25px ',
  }
  const icon = {
    color: 'white',
    fontSize: '15px',
    padding: '0px 10px',
  }
  const bodycontent = {
    padding: '10px 20px ',
  }
  const dropDown = (
    <div
      className="mt-3 d-flex align-items-center"
      style={{ columnGap: '10px', padding: '5px' }}
    >
      <Badge bg="light" style={{ borderRadius: '50%', fontSize: '8px' }}>
        &nbsp;
      </Badge>{' '}
      <Form.Select
        id="dropLast"
        aria-label="Default select example"
        onChange={(e) =>
          setchange({
            [e.target.value]: e.target.value
              .replace(/^./, (str) => str.toUpperCase())
              .replace('_', ' '),
          })
        }
      >
        <option value="">Add schema to segment</option>
        <option
          value="first_name"
          disabled={segment.schema.some((obj) =>
            obj.hasOwnProperty('first_name'),
          )}
        >
          First Name
        </option>
        <option
          value="last_name"
          disabled={segment.schema.some((obj) =>
            obj.hasOwnProperty('last_name'),
          )}
        >
          Last Name
        </option>
        <option
          value="gender"
          disabled={segment.schema.some((obj) => obj.hasOwnProperty('gender'))}
        >
          Gender
        </option>
        <option
          value="age"
          disabled={segment.schema.some((obj) => obj.hasOwnProperty('age'))}
        >
          Age
        </option>
        <option
          value="account_name"
          disabled={segment.schema.some((obj) =>
            obj.hasOwnProperty('account_name'),
          )}
        >
          Account Name
        </option>
        <option
          value="city"
          disabled={segment.schema.some((obj) => obj.hasOwnProperty('city'))}
        >
          City
        </option>
        <option
          value="state"
          disabled={segment.schema.some((obj) => obj.hasOwnProperty('state'))}
        >
          State
        </option>
      </Form.Select>
      <button className="btn btn-light btn-md">
        <MinusOutlined />
      </button>
    </div>
  )

  const addSchema = () => {
    if (addSchema === '') {
      setchange('')
    }
    if (change === undefined) {
      setchange(null)
    } else {
      let some = segment.schema
      some.push(change)
      setSegment({ ...segment, schema: some })
      setchange(null)
      let e = document.getElementById('dropLast')
      e.value = ''
    }
  }
  return (
    <div>
      <div style={main}>
        <LeftOutlined style={icon} />
        <h4 style={{ color: 'white', fontSize: '18px', margin: '0px' }}>
          {' '}
          View Audience{' '}
        </h4>
      </div>
      <div style={bodyelement}>
        {' '}
        <Button onClick={handleShow}>Save segment</Button>
        <Offcanvas
          show={show}
          backdrop="static"
          placement="end"
          onHide={handleClose}
        >
          <Offcanvas.Header style={main}>
            <LeftOutlined style={icon} onClick={handleClose} />
            <Offcanvas.Title style={{ color: 'white', fontSize: '18px' }}>
              Saving segment
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div style={bodycontent}>
              <p style={{ fontSize: '15px' }}>Enter the Name of the Segment </p>
              <Form.Control
                placeholder="Name of the Segment"
                aria-label="Name of the Segment"
                aria-describedby="basic-addon1"
                value={segment.segment_name}
                onChange={segmentchange}
              />
              <div className="mt-3 mb-5 pb-5">
                <p style={{ fontSize: '15px' }}>
                  To save your segment,you need to add the schemas to build the
                  query
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'End',
                    columnGap: '10px',
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    <Badge
                      bg="success"
                      style={{ borderRadius: '50%', fontSize: '8px' }}
                    >
                      &nbsp;
                    </Badge>{' '}
                    <span>- User Traits</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '500' }}>
                    <Badge
                      bg="danger"
                      style={{ borderRadius: '50%', fontSize: '8px' }}
                    >
                      &nbsp;
                    </Badge>{' '}
                    <span>- Group Traits</span>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      border: '2px solid darkturquoise ',
                    }}
                    className="mt-2 "
                  >
                    {segment.schema.map((value, index) => (
                      <div
                        className=" d-flex align-items-center"
                        style={{ columnGap: '10px', padding: '5px' }}
                        key={index}
                      >
                        <Badge
                          bg="success"
                          style={{ borderRadius: '50%', fontSize: '8px' }}
                        >
                          &nbsp;
                        </Badge>{' '}
                        <Form.Select
                          aria-label="Default select example"
                          name={value[index]}
                          disabled
                        >
                          <option value={Object.keys(value)}>
                            {Object.values(value)}
                          </option>
                        </Form.Select>
                        <button className="btn btn-light btn-md">
                          <MinusOutlined />
                        </button>
                      </div>
                    ))}
                  </div>

                  {dropDown}
                </div>
                <div className="mt-3 " style={{ padding: '0px 20px' }}>
                  <p
                    style={{
                      color: 'darkturquoise',
                      fontSize: '14px',
                      marginBottom: '40px',
                    }}
                    onClick={addSchema}
                  >
                    + Add new schema
                  </p>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                columnGap: '10px',
                background: 'lightgray',
                padding: '15px 123px 15px 40px',
                position: 'fixed',
                bottom: '0',
              }}
            >
              <button className="btn btn-success btn-md " onClick={dataSubmit}>
                Save the Segment
              </button>
              <button
                className="btn btn-light btn-md"
                style={{ color: 'red' }}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  )
}

export default Main
