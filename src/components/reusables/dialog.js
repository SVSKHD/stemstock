import { Button, Modal } from "react-bootstrap";

const StemReusableDialog = (props) => {
  const { title, description, onShow, onHide , size} = props;
  return (
    <>
      <Modal
        show={onShow}
        onHide={onHide}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-theme text-white">
          <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{description}</h4>
          {props.children}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default StemReusableDialog;
