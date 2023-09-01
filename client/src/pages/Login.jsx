import {Input, Card, Button } from "@nextui-org/react";
import { Form } from "react-router-dom";

export default function Login() {
  return (
    <Card className="w-[50rem] space-y-5 p-4" radius="2xl">
      <Form>
        <Input
          isRequired
          type="text"
          Label="Username"
          placeholder="Username"
          className="w-[100%]"
        />
        <Input
          isRequired
          type="password"
          Label="Password"
          placeholder="Password"
          className="w-[100%]"
        />
        <Button type="submit" value="Submit"/>
      </Form>
    </Card>
  );
}
