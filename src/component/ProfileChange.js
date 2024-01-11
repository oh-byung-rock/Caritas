import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { uploadFile } from './Awss3'; 
import { Buffer } from 'buffer';

const ProfileChange = ({ userId, setOpenProfileChange, openProfileChange, setPhotoURL,currentUser }) => {
    const [selectedFile, setSelectedFile] = useState(null);


    const handleClose = () => {
        setOpenProfileChange(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        if (file && file.type.startsWith("image/")) {
            if(file.type !== 'image/jpeg' || fileExt !=='jpg'){
                alert('jpg 파일만 Upload 가능합니다.');
                setSelectedFile(null);
                return;
              } else {
            setSelectedFile(file);
              }
        } else {
            alert("이미지 파일만 선택해주세요");
            setSelectedFile(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("이미지 파일을 선택해주세요");
            return;
        }
        try {
            // File 객체는 브라우저의 메모리에서 직접 접근할 수 없으므로 Buffer 형태로 변환
            const fileContent = Buffer.from(await selectedFile.arrayBuffer());
            // AWS S3에 업로드
            await uploadFile(`images/${userId}`, fileContent);
            console.log('아이스크림', userId)
            alert("프로필 사진이 업로드되었습니다.");
            setPhotoURL(URL.createObjectURL(selectedFile)); // 프로필'만' 새로고침 
            setSelectedFile(null);
            setOpenProfileChange(false);
        } catch (error) {
            alert("업로드 중 문제가 발생했습니다.");
            console.log(error);
        }
    };

    return (
        <div>
            <Dialog open={openProfileChange} onClose={handleClose}>
                <DialogTitle>프로필 이미지 변경</DialogTitle>
                <DialogContent>
                    <input type="file" accept="image/*" onChange={handleFileChange} />
                    <button onClick={handleUpload}>저장</button>
                    <button onClick={handleClose}>취소</button>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ProfileChange;
