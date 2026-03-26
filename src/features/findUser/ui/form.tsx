"use client";

import { Field } from "@/shared/ui/Field";
import { Input } from "@/shared/ui/Input";
import { useFindUserStore } from "../model/store";
import { ChangeEvent } from "react";
import { useUserStore } from "@/entities/user/model/store";

export function FindUserForm() {
  const { setQuery, search } = useFindUserStore();
  const { currentUser } = useUserStore();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    search(value, currentUser?.uuid!);
  };

  return (
    <div>
      <Field>
        <Input
          id="input-button-group"
          placeholder="Type to search..."
          onChange={handleSearch}
        />
      </Field>
    </div>
  );
}
