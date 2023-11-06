import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// ユーザー情報を表すインターフェイスを定義
interface User {
  user_id: string;
  nickname: string;
  comment: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user_id = localStorage.getItem('user_id');
      if (!user_id) {
        navigate('/login');
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8000/accounts/users/${user_id}/`);
        setUser(response.data.user);
      } catch (err) {
        // ここでエラーの型チェックを行います
        if (axios.isAxiosError(err)) {
          const errorMsg = err.response?.data?.message || 'ユーザー情報の取得に失敗しました。';
          setError(errorMsg);
        } else {
          setError('An unexpected error occurred.');
        }
        console.error('エラー発生', err);
      }
    };
  
    fetchUserProfile();
  }, [navigate]);
  

  return (
    <div className="user-profile">
      <h1>ユーザープロフィール</h1>
      {user && (
        <div>
          <p>ユーザーID: {user.user_id}</p>
          <p>ニックネーム: {user.nickname}</p>
          <p>コメント: {user.comment}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;