
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { authService } from "../services/auth-service";
import { Button } from "react-native";

export function Home() {
  const {trigger} = useAsyncAction(async () => {
    await authService.login('petargabriel.matev@gmail.com');
  })

  return (
    <Button title="Login" onPress={trigger} />
  )
}
