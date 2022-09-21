import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Analytics from "../../components/profile-box/Analytics";
import ProfileBox from "../../components/profile-box/ProfileBox";
import { UseCurrentTheme } from "../../contexts/themeCtx";
import { UseCurrentUser } from "../../contexts/userCtx";
import { GET_USER } from "../../query-queries";

export default function Profile() {
    const { getTheme } = UseCurrentTheme()
    const { getUser } = UseCurrentUser()
    const { data, loading, refetch } = useQuery(GET_USER, {
        variables: {
            id: getUser().id
        }
    })
    const { id } = useParams()
    const { data: dataNonCurrUser, refetch: refetchNonCurrUser } = useQuery(GET_USER, {
        variables: {
            id: id
        }
    })

    if (data)
        console.log(data);
    if (dataNonCurrUser)
        console.log(dataNonCurrUser);
    return (
        <div className="app" style={{ ...getTheme() }}>
            <>
                <Header />
                <div className="profile__body">
                    <ProfileBox refetch={refetch} refetchNonCurrUser={refetchNonCurrUser} />
                    <Analytics dataCurrUser={data} dataNonCurrUser={dataNonCurrUser} />
                    <Footer />
                </div>
            </>
        </div>
    )
}