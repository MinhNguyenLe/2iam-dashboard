import React from "react";
import { connect } from "react-redux";

import { Text } from "components/ResumeBuilder/component";
import { WorkExperience, Education, Skills, Photo } from "./Elements";
import styles from "./one.module.scss";

import { TProps } from "./one";
import SocialMedia from "./Elements/SocialMedia";
import Summary from "./Elements/Summary";

class Template extends React.Component<TProps> {
  render() {
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
          style={{ borderTopColor: "#03A9F4" }}
        />

        <div className={styles.image}>
          <Photo photo={this.props.iam.image} />
        </div>

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

        <div className={[styles.info, styles.box].join(" ")}>
          <Text
            value={this.props.summary.object_title}
            stateName="summary.object_title"
            placeholder="Summary"
            customClass={styles.title}
            tag="div"
          />
          <Summary data={this.props.summary.details} />
        </div>

        <div className={[styles.info, styles.box].join(" ")}>
          <Text
            value={this.props.skills.object_title}
            stateName="skills.object_title"
            placeholder="Skills"
            customClass={styles.title}
            tag="div"
          />
          <Skills data={this.props.skills.lists} />
        </div>

        <div className={[styles.box].join(" ")}>
          <Text
            value={this.props.educations.object_title}
            stateName="educations.object_title"
            placeholder="Educations"
            customClass={styles.title}
            tag="div"
          />
          <Education data={this.props.educations.lists} />
        </div>

        <div className={[styles.box].join(" ")}>
          <Text
            value={this.props.experiences.object_title}
            stateName="experiences.object_title"
            placeholder="Experiences"
            customClass={styles.title}
            tag="div"
          />
          <WorkExperience data={this.props.experiences.lists} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: any) => ({
  iam: store.iam,
  contact: store.contact,
  summary: store.summary,
  skills: store.skills,
  educations: store.educations,
  experiences: store.experiences,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Template);
