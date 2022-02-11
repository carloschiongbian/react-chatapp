import "../public/css/components/membersListCard/styles.css";

const MemberListCard = ({members}) => {
    return (
        <> 
            {
                members.map((member, index) => {
                    return(
                        <div className="member-card" key={index}>
                            <div className="member-profileImage">
                                <img src={member.profile_image}  />
                            </div>
                            <span className="member-name">{member.member_name}</span>
                        </div>
                    );
                })
            }
        </>
    );
}
 
export default MemberListCard;