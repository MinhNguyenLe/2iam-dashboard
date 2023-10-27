import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Loading from "../Loading";
import styles from "./topNavbar.module.scss";
import useUpdateResume from "hooks/useUpdateResume";

const TopNavbar = () => {
  const [saveModal, setSaveModal] = useState<boolean>(false);
  const { updateResume, isLoading, resume } = useUpdateResume();

  return (
    <>
      <div className={styles.TopNavbar}>
        <div
          className={[styles.item, styles.tonNavbarFlex1].join(" ")}
          onClick={() => {
            console.log(resume)
            setSaveModal(true);
          }}
        >
          <div className={styles.topNavbarSave}>
            <div className={styles.topPart}>
              <i className="material-icons">save</i>
            </div>
            <div className={styles.bottomPart}>Save</div>
          </div>
        </div>
      </div>

      <Modal
        show={saveModal}
        onHide={() => setSaveModal(false)}
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h3 className="modal-title w-100 text-center">Save Your Data</h3>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.saveModal}>
            <p>
              By storing your information, in the future you can use it to edit
              your resume.
            </p>

            <div
              className={styles.saveModalBtn}
              onClick={async () => {
                await updateResume();
                setSaveModal(false);
              }}
            >
              SAVE
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Loading show={isLoading} />
    </>
  );
};

export default TopNavbar;
