import React, { useState } from "react";
import { ListItem } from "../../components/ListItem";
import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { TabBarItem } from "../../components/TabBarItem";
import { Avatar9 } from "../../icons/Avatar9";
import { Icon12 } from "../../icons/Icon12";
import { Icon11 } from "../../icons/Icon11";
import { Icon10 } from "../../icons/Icon10";
import { Icon8 } from "../../icons/Icon8";
import { BiSearch} from 'react-icons/bi';
import { RightButton7 } from "../../icons/RightButton7";
import axios from "axios";
import "./style.css";

export const Friends = () => {
    const [friendname, setFriendName] = useState("");
    const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search?name=${friendname}`);

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error("검색 요청이 실패했습니다.");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="searchFriends">
        <div className="search-friends">
            <NavBar
                className="nav-bar-instance"
                divClassName="nav-bar-3"
                leftControl="icon"
                pageTitle="친구 찾기"
                rightControl="none"
                leftLink="/feed"
             />
            <div className="text-field-instance">
                <input className="input-field-stock"
                    type="text"
                    name="friendname"
                    value={friendname}
                    onChange={(e) => setFriendName(e.target.value)}
                    onKeyPress={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                    }}
                    placeholder="닉네임" />
                <BiSearch className="searchbar-icon" onClick={handleSearch} />
            </div>
            <div className="friends">
                {searchResults.map((result, index) => (
                <ListItem
                key={index}
                className="list-item-5"
                controls="icon"
                divClassName="list-item-4"
                icon={<Avatar9 className="avatar-15" />}
                override={<RightButton7 className="right-button-6" />}
                showDescription={false}
                title={result.nickname}
                visuals="avatar"
                />
            ))}
            </div>
            <div className="tab-bar">
              <TabBarItem className="tab-3" icon={<Link to="/home"><Icon11 className="icon-2" /></Link>} selected={false} title="Home" />
              <TabBarItem className="tab-3" icon={<Link to="/point-home"><Icon8 className="icon-2" /></Link>} selected={false} title="Point" />
              <TabBarItem className="tab-bar-item-instance" icon={<Link to="/feed"><Icon12 className="icon-2" /></Link>} selected={true} title="Feed" />
              <TabBarItem className="tab-3" icon={<Link to="/profile"><Icon10 className="icon-2" /></Link>} selected={false} title="Profile" />
          </div>
        </div>
    </div>
  )
};
