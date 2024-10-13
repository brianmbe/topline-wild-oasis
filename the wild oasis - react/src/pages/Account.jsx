import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

export default function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <div style={{ display: "flex", gap: "4rem" }}>
        <Row>
          <Heading as="h2">Update user data</Heading>
          <UpdateUserDataForm />
        </Row>

        <Row>
          <Heading as="h2">Update password</Heading>
          <UpdatePasswordForm />
        </Row>
      </div>
    </>
  );
}
