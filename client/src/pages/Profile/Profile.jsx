import { ProfilePage, ProfileContainer, EditContainer, Button, FormContainer, FormGroup, OuterContainer } from './ProfileStyled'
import { EditInput } from '../../components/EditInput/EditInput'
import { useForm } from 'react-hook-form';
import { useUser } from "../../Context/UserContext"
import { zodResolver } from '@hookform/resolvers/zod'
import { editSchema } from '../../schemas/editSchema';
import { editUser, userLogged } from '../../services/userServices';
import { ErrorSpan } from '../Auth/ErrorSpanStyled';
import { useEffect } from 'react';

export default function Profile() {

  const {user, setUser} = useUser()

    const {
        register, 
        handleSubmit,
        formState: {errors}
      } = useForm({resolver: zodResolver(editSchema)})

      async function editHandleSubmit(data){
        try {
          await editUser(data, user._id)
          const response = await userLogged()
            setUser(response)
        } catch (error){
          console.log(error)
        }
      }

    return (
        <OuterContainer>
            {user._id && (
              <ProfilePage>
                  <ProfileContainer>
                      <img src={user.avatar} alt="Foto do usuário" />
                      <h1> {user.name} </h1>
                      <h2> @{user.username}</h2>
                  </ProfileContainer>
                  <EditContainer>
                      <h1> Editar Perfil </h1>
                      <FormContainer onSubmit={handleSubmit(editHandleSubmit)}>
                          <FormGroup>
                              <label>Nome</label>
                              <EditInput type="text" name="name" value={user.name} register={register}/>
                              {errors.name && <ErrorSpan> {errors.name.message} </ErrorSpan>}
                          </FormGroup>
                          <FormGroup>
                              <label>Usuário</label>
                              <EditInput type="text" name="username" value={user.username} register={register}/>
                              {errors.username && <ErrorSpan> {errors.username.message} </ErrorSpan>}
                          </FormGroup>
                          <FormGroup>
                              <label>E-mail</label>
                              <EditInput type="email" name="email" value={user.email} register={register}/>
                              {errors.email && <ErrorSpan> {errors.email.message} </ErrorSpan>}
                          </FormGroup>
                          <FormGroup>
                              <label>URL da foto</label>
                              <EditInput type="text" name="avatar" value={user.avatar} register={register}/>
                              {errors.avatar && <ErrorSpan> {errors.avatar.message} </ErrorSpan>}
                          </FormGroup>
                          <Button type="submit">Confirmar Edição</Button>
                      </FormContainer>
                  </EditContainer>
              </ProfilePage>
            )}
        </OuterContainer>
    )
}

