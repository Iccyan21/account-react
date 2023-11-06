import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface DeleteProps {
  user_id: string; // `user_id`の型を指定
}

const Delete = () => {
  const [error, setError] = useState<string | null>(null);
  const { user_id } = useParams(); 

  const userId = user_id as string;


  const handleDelete = async () => {
    setError(null); // Reset errors

    try {
      await axios.post(`http://localhost:8000/accounts/delete/${user_id}/`); // `user_id`を正しく使用
      alert('アカウントが正常に削除されました。');
      // Redirect or logout user
    } catch (error: any) { // TypeScriptの場合、errorの型を指定する
      if (axios.isAxiosError(error) && error.response) {
        // Handle server response error
        setError('アカウントの削除に失敗しました: ' + error.response.data.message);
      } else {
        // Handle other errors
        setError('アカウントの削除中に問題が発生しました。');
      }
    }
  };

  return (
    <div>
        <h1>アカウント削除</h1>
        <p>ユーザーID: {userId}</p>
        <p>アカウントを削除しますか？</p>
      <button onClick={handleDelete}>アカウントを削除</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Delete;
