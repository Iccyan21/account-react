import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignUp: React.FC = () => {
  const [user_id, setUser_Id] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // パスワードの一致確認
    if (password !== password_confirmation) {
        console.error("パスワードが一致しません");
        return;
    }

    try {
      // バックエンドにPOSTリクエストを送る(先ほどgit cloneしてい、サーバーを立ち上げたもののURL)
      const response = await axios.post('http://127.0.0.1:8000/accounts/signup/', {
        user_id: user_id,
        nickname: nickname,
        password: password,
        password_confirmation: password_confirmation
        
      });
      alert('アカウントが作成されました');
      navigate("/login");
    } catch (error) {
      setError('アカウントを作成できませんでした...');
    }
  };

  return (
    <div className='Register'>
            <h1>アカウント新規登録画面</h1>
            <form onSubmit={handleSubmit} className="Form">
            <input
                type="text"
                placeholder="ユーザーID"
                value={user_id}
                onChange={(e) => setUser_Id(e.target.value)}
            />
            <input
                type="text"
                placeholder="ニックネーム"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
            />
            <input
                type="password"
                placeholder="パスワード"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="確認パスワード"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <button type="submit">登録</button>
        </form>
    </div>
        
  );
};

export default SignUp;