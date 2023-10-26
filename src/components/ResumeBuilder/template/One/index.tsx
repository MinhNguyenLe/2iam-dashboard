import React from "react";
import { connect } from "react-redux";

import { Text } from "components/ResumeBuilder/component";
import { WorkExperience, Education, Skills, Photo } from "./Elements";
import styles from "./one.module.scss";

import { TProps } from "./one";
import SocialMedia from "./Elements/SocialMedia";

class Template extends React.Component<TProps> {
  render() {
    const { itemStatus } = this.props;
    return (
      <div className={styles.insideCon}>
        <div>
          <Text
            value={this.props.iam.full_name}
            stateName="iam.full_name"
            placeholder="Your full name"
            customClass={styles.name}
          />
          <Text
            value={this.props.iam.nickname}
            stateName="iam.nickname"
            placeholder="Nickname"
          />
          <Text
            value={this.props.iam.position}
            stateName="iam.position"
            placeholder="Position"
          />
        </div>
        <div
          className={styles.underName}
          style={{ borderTopColor: this.props.theme.color }}
        />

        {itemStatus.picture && (
          <div className={styles.image}>
            <Photo userData={this.props.userData} />
          </div>
        )}

        <div className={[styles.info, styles.box].join(" ")}>
          <Text
            value={this.props.contact.object_title}
            stateName="contact.object_title"
            placeholder="Contact"
            customClass={styles.title}
            tag="div"
          />
          <Text
            value={this.props.contact.email}
            stateName="contact.email"
            placeholder="sample@gmail.com"
          />
          <Text
            value={this.props.contact.phone_number}
            stateName="contact.phone_number"
            placeholder="0123 456 7890"
          />
          <Text
            value={this.props.contact.address}
            stateName="contact.address"
            placeholder="Ho Chi Minh, Vietnam"
          />
          <Text
            value={this.props.contact.current_company}
            stateName="contact.current_company"
            placeholder="Btaskee"
          />
          <Text
            value={this.props.contact.website}
            stateName="contact.website"
            placeholder="2iam.net"
          />
          <SocialMedia data={this.props.contact.social_media} />
        </div>

        {itemStatus.info && (
          <div className={[styles.info, styles.box].join(" ")}>
            <Text
              value={this.props.userData.infoTitle}
              stateName="userData.infoTitle"
              placeholder="Personal info"
              customClass={styles.title}
              tag="div"
            />
            <Text
              value={this.props.userData.address}
              stateName="userData.address"
              placeholder="address: Berlin, Germany"
            />
            <Text
              value={this.props.userData.email}
              stateName="userData.email"
              placeholder="sample@email.com"
            />
            <Text
              value={this.props.userData.mobile}
              stateName="userData.mobile"
              placeholder="(+1) 123 456 7890"
            />
            <Text
              value={this.props.userData.userData}
              stateName="userData.userData"
              placeholder="Your other data"
            />
          </div>
        )}

        {itemStatus.profile && (
          <div className={[styles.profile, styles.box].join(" ")}>
            <Text
              value={this.props.userData.profileTitle}
              stateName="userData.profileTitle"
              placeholder="Profile"
              customClass={styles.title}
              tag="div"
            />
            <Text
              value={this.props.userData.profile}
              stateName="userData.profile"
              placeholder="I'm a full-stack developer..."
            />
          </div>
        )}

        {itemStatus.workExperience && (
          <div className={[styles.workExperience, styles.box].join(" ")}>
            <Text
              value={this.props.userData.workExperienceTitle}
              stateName="userData.workExperienceTitle"
              placeholder="Work experience"
              customClass={styles.title}
              tag="div"
            />
            <WorkExperience
              data={this.props.workExperience}
              color={this.props.theme.color}
            />
          </div>
        )}

        {itemStatus.education && (
          <div className={[styles.education, styles.box].join(" ")}>
            <Text
              value={this.props.userData.educationTitle}
              stateName="userData.educationTitle"
              placeholder="Education"
              customClass={styles.title}
              tag="div"
            />
            <Education data={this.props.education} />
          </div>
        )}

        {itemStatus.skills && (
          <div className={[styles.skills, styles.box].join(" ")}>
            <Text
              value={this.props.userData.skillsTitle}
              stateName="userData.skillsTitle"
              placeholder="Skills"
              customClass={styles.title}
              tag="div"
            />

            <Skills data={this.props.skills} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store: any) => ({
  theme: store.theme,
  userData: store.userData,
  workExperience: store.workExperience,
  education: store.education,
  skills: store.skills,
  itemStatus: store.itemStatus,
  iam: store.iam,
  contact: store.contact,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
