import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import styled from "styled-components";

const DetailsContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  color: white;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;

  &:hover {
    opacity: 1;
  }
`;

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  touch-action: none;

  /* &:hover ${DetailsContainer} {
    opacity: 1;
  } */
`;

const ImageContainer = styled.div`
  height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  position: absolute;
  bottom: 0;
  transition: all 0.4s ease;
`;

const Title = styled.h6`
  font-size: 18px;
  margin: 10px 0;
`;

const Author = styled.p``;

const MediaItem = ({ i }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: i.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <Container ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ImageContainer>
        <Image src={i.img} />
      </ImageContainer>
      <DetailsContainer>
        <Details>
          <Title>{i.title}</Title>
          <Author>{i.author}</Author>
        </Details>
      </DetailsContainer>
    </Container>
  );
};

export default MediaItem;
