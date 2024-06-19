import { Button, Modal } from 'react-bootstrap';


function Delete({ isShow, onOk, onClose }) {
    return (
        <Modal show={isShow} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa bản ghi</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn xóa bản ghi này không?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Không
                </Button>
                <Button variant="danger" onClick={onOk}>
                    Đồng ý
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Delete;