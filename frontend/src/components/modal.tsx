import { useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 px-4">
			<div className="flex justify-center overflow-hidden">
				<div
					className="fixed inset-0 bg-gray-500 bg-opacity-75"
					onClick={onClose}
				></div>
				<div className="inline-block bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full mt-8">
					<div className="bg-white p-4 relative">{children}</div>
				</div>
			</div>
		</div>
	);
}
