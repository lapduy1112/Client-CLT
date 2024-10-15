import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "@mui/joy/Button";
import Divider from "@mui/joy/Divider";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogActions from "@mui/joy/DialogActions";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import FormHelperText from "@mui/joy/FormHelperText";
import Stack from "@mui/material/Stack";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormLabel from "@mui/joy/FormLabel";
import FormControl from "@mui/joy/FormControl";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Option from "@mui/joy/Option";
import { useSearchParams } from "next/navigation";
import { getErrorMessage } from "@/libs/common/utils/error";
import axios, { AxiosError } from "axios";
import { getPortById, updatePort } from "@/libs/common/utils/fetchRoute";
import { PortUpdateInterface } from "@/libs/common/interfaces/update-port.interface";
const validationSchema = Yup.object({
  address: Yup.string(),
  lat: Yup.string(),
  lon: Yup.string(),
});
export default function UpdatePortModal({
  open,
  setOpen,
  id,
  setSelectedId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const searchTerm = searchParams.get("searchTerm");
  const page = searchParams.get("page");
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ["port", { id: id }],
    queryFn: () => getPortById(id),
    retry: false,
    retryOnMount: false,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
  const mutation = useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: PortUpdateInterface;
      id: string;
    }) => {
      return await updatePort(data, id);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["port", { id: data.id }], data),
        queryClient.invalidateQueries({
          queryKey: ["port", { sort, searchTerm, page }],
        }),
        toast.success("Port Updated successfully"),
        setSelectedId("");
      setOpen(false);
    },
    onError: (error: Error | AxiosError) => {
      setSelectedId("");
      setOpen(false);
      if (axios.isAxiosError(error)) {
        toast.error(getErrorMessage(error?.response?.data));
      } else {
        toast.error(getErrorMessage(error));
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      address: undefined,
      lat: undefined,
      lon: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      mutation.mutate({
        id: id,
        data: {
          address: values.address,
          lat: values.lat,
          lon: values.lon,
        },
      });
    },
  });
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setSelectedId("");
        }}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>Update Port</DialogTitle>
          <Divider />
          {isSuccess && data && (
            <form onSubmit={formik.handleSubmit} id="udpatedForm">
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" }, my: 1 }}>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack spacing={1}>
                    <FormLabel>Id</FormLabel>
                    <FormControl
                      sx={{
                        display: { sm: "flex-column", md: "flex-row" },
                        gap: 2,
                      }}>
                      <Input
                        size="sm"
                        placeholder="Id"
                        defaultValue={data?.id}
                        disabled
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Address"
                        id="address"
                        name="address"
                        defaultValue={data?.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.address}
                        error={
                          formik.touched.address &&
                          Boolean(formik.errors.address)
                        }
                      />
                      {formik.touched.address &&
                        Boolean(formik.errors.address) && (
                          <FormHelperText>
                            {formik.errors.address}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Latitude</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Latitude"
                        id="lat"
                        name="lat"
                        defaultValue={data?.lat}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lat}
                        error={formik.touched.lat && Boolean(formik.errors.lat)}
                      />
                      {formik.touched.lat && Boolean(formik.errors.lat) && (
                        <FormHelperText>{formik.errors.lat}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>Longtitude</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Longtitude"
                        id="lon"
                        name="lon"
                        defaultValue={data?.lon}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lon}
                        error={formik.touched.lon && Boolean(formik.errors.lon)}
                      />
                      {formik.touched.lon && Boolean(formik.errors.lon) && (
                        <FormHelperText>{formik.errors.lon}</FormHelperText>
                      )}
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl>
                      <FormLabel>CreatedAt</FormLabel>
                      <Input
                        size="sm"
                        defaultValue={data?.createdAt}
                        disabled
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>UpdatedAt</FormLabel>
                      <Input
                        size="sm"
                        defaultValue={data?.updatedAt}
                        disabled
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </Stack>
            </form>
          )}

          <DialogActions>
            <Button
              form="udpatedForm"
              sx={{ backgroundColor: "#000000" }}
              variant="solid"
              color="neutral"
              type="submit"
              disabled={isPending || mutation.isPending}>
              Update
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => {
                setOpen(false), setSelectedId("");
              }}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
