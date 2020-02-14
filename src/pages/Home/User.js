import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneAlt,
  faMapMarker,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";

import { Row, Col } from "../../components/UX";

const ProfileInfo = ({ title, info }) => (
  <Row>
    <Col size="auto">
      <h5>{title}</h5>
    </Col>
    <Col>
      <span>{info}</span>
    </Col>
  </Row>
);

const ProfileSection = props => (
  <div className="user-profile-section text-center mb-3 p-2" {...props} />
);

const User = props => {
  const {
    imageBaseURL,
    passport_photo,
    name,
    mobile_no,
    email_address,
    location,
    showFull,
    farmer_id,
    reg_no,
    bvn,
    occupation,
    city,
    lga,
    state,
    nationality,
    gender,
    marital_status,
    spouse_name,
    dob,
    first_name,
    id_image,
    id_type,
    id_no,
    issue_date,
    expiry_date,
    ...otherProps
  } = props;

  return (
    <Row className="user-list mb-5 p-2" {...otherProps}>
      <Col>
        <Row>
          <Col size="auto">
            <img
              src={imageBaseURL + passport_photo}
              alt={name}
              className="user-face"
            />
            <h6 className="text-bold">{name}</h6>
          </Col>
          <Col>
            <div>
              <FontAwesomeIcon icon={faPhoneAlt} /> <span>{mobile_no}</span>
            </div>
            {email_address && (
              <div>
                <FontAwesomeIcon icon={faEnvelope} />{" "}
                <span>{email_address}</span>
              </div>
            )}
            <div>
              <FontAwesomeIcon icon={faMapMarker} /> <span>{location}</span>
            </div>
          </Col>
        </Row>
      </Col>
      {showFull && (
        <Col size="12">
          <ProfileSection>
            <ProfileInfo title="Farmer ID" content={farmer_id} />
            <ProfileInfo title="Registration Number" content={reg_no} />
            <ProfileInfo title="BVN" content={bvn} />
          </ProfileSection>
          <ProfileSection>
            <ProfileInfo title="Occupation" content={occupation} />
            <ProfileInfo title="City" content={city} />
            <ProfileInfo title="LGA" content={lga} />
            <ProfileInfo title="State" content={state} />
            <ProfileInfo title="Nationality" content={nationality} />
          </ProfileSection>
          <ProfileSection>
            <ProfileInfo title="Gender" content={gender} />
            <ProfileInfo title="Marital Status" content={marital_status} />
            {spouse_name && (
              <ProfileInfo title="Spouse Name" content={spouse_name} />
            )}
            <ProfileInfo title="Date of Birth" content={dob} />
          </ProfileSection>
          <ProfileSection>
            <div className="mb-2">
              <img
                className="id-image"
                src={imageBaseURL + id_image}
                alt={first_name + "'s " + id_type}
              />
            </div>
            <ProfileInfo title="ID Type" content={id_type} />
            <ProfileInfo title="ID Number" content={id_no} />
            <ProfileInfo title="Issue Date" content={issue_date} />
            <ProfileInfo title="Expiry Date" content={expiry_date} />
          </ProfileSection>
        </Col>
      )}
    </Row>
  );
};

export default User;
