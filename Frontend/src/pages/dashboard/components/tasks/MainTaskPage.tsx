import { useAppSelector } from '@/store';
import React from 'react';
import { useParams } from 'react-router-dom';

declare global {
    interface Window {
        modal3:any;
    }
}

function MainTaskPage() {
  // const data = useAppSelector(store => store)
const{ jobId } = useParams();
  console.log("🚀 ~ jobId:", jobId)
  return (
    <div>
      <button
        className="btn-outline btn-error btn-lg btn"
        onClick={() => window.modal3.showModal()}
      >
        Delete
      </button>
      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
            ✕
          </button>
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
        </form>
      </dialog>
    </div>
  );
}

export default MainTaskPage;
