import { createPortal } from "react-dom";

export default function Modal({
    title,
    content,
    show,
    onClose
}) {
    if (!show) return null

    return createPortal(
        <div className="modalContainer">
            <div className="modal">
                <h2>{title}</h2>
                {content}
                <div>
                    <button onClick={onClose}>Chiudi</button>
                </div>
            </div>
        </div>,
        document.body
    )
}   