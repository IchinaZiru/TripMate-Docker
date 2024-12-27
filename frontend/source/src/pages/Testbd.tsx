import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import goshikiImage from '../images/stub/goshiki.jpg';
import InawashiroImage from '../images/stub/inawashiro.jpg';
import OoutiImage from '../images/stub/ooutiyado.jpg';
import miharuImage from '../images/stub/miharu.jpg';

// 観光地データ
const touristSpots = [
    { id: 1, name: "五色沼", description: "美しい自然の景観", imageUrl: goshikiImage, address: "福島県", timeRequired: "2時間", cost: "1000円" },
    { id: 2, name: "猪苗代湖", description: "湖畔でリラックスできる場所", imageUrl: InawashiroImage, address: "福島県", timeRequired: "3時間", cost: "1500円" },
    { id: 3, name: "大内宿", description: "昔ながらの宿場町", imageUrl: OoutiImage, address: "福島県", timeRequired: "5時間", cost: "3000円" },
    { id: 4, name: "三春滝桜", description: "壮大な桜の景色", imageUrl: miharuImage, address: "福島県", timeRequired: "2時間", cost: "1200円" }
];

const Testdb: React.FC = () => {
    const [selectedSpots, setSelectedSpots] = useState<
        { id: number; name: string; description: string; imageUrl: string; address: string; timeRequired: string; cost: string }[]
    >([]);
    const navigate = useNavigate();

    // 観光地を選択したときの処理
    const handleSelectSpot = (spot: any) => {
        if (!selectedSpots.some(s => s.id === spot.id)) {
            setSelectedSpots([...selectedSpots, spot]);
        }
    };

    // 観光地を削除する処理
    const handleRemoveSpot = (id: number) => {
        setSelectedSpots(selectedSpots.filter(spot => spot.id !== id));
    };

    // 選択をリセットする処理
    const handleResetSelection = () => {
        setSelectedSpots([]);
    };

    // プランを作成する処理（仮）
    const handleCreatePlan = () => {
        alert('プランを作成しました！');
    };

    // 条件を変更する処理
    const handleChangeConditions = () => {
        navigate("/search");
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* 上部: 観光地リスト */}
            <div style={{ marginBottom: '20px' }}>
                <h1>観光地リスト</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {touristSpots.map((spot) => (
                        <TouristSpotCard key={spot.id} spot={spot} onSelect={handleSelectSpot} />
                    ))}
                </div>
            </div>

            {/* 下部: 選択された観光地 */}
            <div
                style={{
                    marginTop: '40px',
                    border: '2px dashed #ccc',
                    padding: '20px',
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    alignItems: 'center',
                    overflowY: 'auto',  // 縦スクロールを可能にする
                    maxHeight: '400px'  // 最大高さを設定して、スクロールが発生するようにする
                }}
            >
                <h2>選択された観光地</h2>
                {selectedSpots.length === 0 ? (
                    <p>選択された観光地はありません。</p>
                ) : (
                    selectedSpots.map((spot) => (
                        <DraggableTouristSpot key={spot.id} spot={spot} onRemove={handleRemoveSpot} />
                    ))
                )}
            </div>

            {/* ボタンエリア */}
            <div
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '20px',  // 最下部に余白を追加
                }}
            >
                <button
                    onClick={handleCreatePlan}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    これでプランを作成
                </button>
                <button
                    onClick={handleChangeConditions}
                    style={{
                        backgroundColor: '#2196F3',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    条件を変更
                </button>
                <button
                    onClick={handleResetSelection}
                    style={{
                        backgroundColor: '#f44336',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    選択された観光地をリセット
                </button>
            </div>
        </div>
    );
};

// 観光地カードコンポーネント（上部に表示）
const TouristSpotCard: React.FC<{ spot: any; onSelect: (spot: any) => void }> = ({ spot, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(spot)}
            style={{
                width: '200px',
                margin: '10px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <img src={spot.imageUrl} alt={spot.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }} />
            <h3>{spot.name}</h3>
            <p>{spot.address}</p>
            <p><strong>所要時間:</strong> {spot.timeRequired}</p>
            <p><strong>費用:</strong> {spot.cost}</p>
            <p>{spot.description}</p>
        </div>
    );
};

// ドラッグされた観光地を下部に表示
const DraggableTouristSpot: React.FC<{ spot: any; onRemove: (id: number) => void }> = ({ spot, onRemove }) => {
    return (
        <div
            style={{
                width: '150px',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}
        >
            <img src={spot.imageUrl} alt={spot.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '5px' }} />
            <h4 style={{ fontSize: '14px', margin: '5px 0' }}>{spot.name}</h4>
            <p style={{ fontSize: '12px', textAlign: 'center' }}>{spot.address}</p>
            <p style={{ fontSize: '12px' }}><strong>所要時間:</strong> {spot.timeRequired}</p>
            <p style={{ fontSize: '12px' }}><strong>費用:</strong> {spot.cost}</p>
            <button
                onClick={() => onRemove(spot.id)}
                style={{
                    backgroundColor: 'red',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontSize: '12px'
                }}
            >
                削除
            </button>
        </div>
    );
};

export default Testdb;
