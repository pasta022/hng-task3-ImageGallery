import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { images } from "../data";
import MediaItem from "./MediaItem";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import Topbar from "./Topbar";
import { Search } from "@mui/icons-material";
import { TailSpin } from "react-loader-spinner";
import Error from "./Error";
import { mobile } from "../responsive";

const Container = styled.div``;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 30vh;
  color: white;
  background-color: black;
  padding: 20px;

  ${mobile({
    flexDirection: "column",
    justifyContent: "center",
  })}
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid white;
  border-radius: 5px;
  width: 300px;
  height: 40px;
  padding: 5px;
`;

const SearchInput = styled.input`
  width: 85%;
  height: 25px;
  border: none;
  background-color: transparent;
  color: white;
  padding: 5px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: white;
  }
`;

const SearchIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

const BodyContainer = styled.div`
  position: relative;
  height: ${(props) => (props.loading ? "50vh" : "auto")};
`;

const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
`;

const DndContainer = styled.div``;

const GridContainer = styled.div`
  padding: 20px;
  touch-action: none;
`;

const Item = styled.div``;

const Media = () => {
  // component states
  const [pictures, setPictures] = useState(images);
  const [loading, setLoading] = useState(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // dnd sensors declaration
  const mouse = useSensor(MouseSensor);
  const touch = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboard = useSensor(KeyboardSensor);
  const pointer = useSensor(PointerSensor);

  const sensors = useSensors(mouse, touch, pointer, keyboard);

  // occurs when an item is dragged
  const handleDragEnd = (e) => {
    console.log("drag end called");
    const { active, over } = e;
    if (active && over && active?.id !== over?.id) {
      setPictures((pictures) => {
        const oldIndex = pictures.findIndex((item) => item?.id === active.id);
        const newIndex = pictures.findIndex((item) => item?.id === over.id);
        return arrayMove(pictures, oldIndex, newIndex);
      });
    }
  };

  // search button function
  const handleSearchSubmit = () => {
    setButtonClicked(true);
  };

  // useEffect for when the a search is made
  useEffect(() => {
    if (!query) {
      setPictures(images);
    }
    if (buttonClicked) {
      setLoading(true);
      setImageLoading(true);
      const searchedData = images.filter((image) =>
        image.tags.some((tag) => tag.includes(query))
      );

      if (searchedData.length > 0) {
        setPictures(searchedData);
      } else {
        setError(true);
      }
      setTimeout(() => {
        setButtonClicked(false);
        setLoading(false);
        setImageLoading(false);
      }, 1500);
    }
  }, [buttonClicked, query]);

  setTimeout(() => {
    setImageLoading(false);
  }, 3000);

  return (
    <Container>
      <HeaderContainer>
        <Topbar />
        <SearchContainer>
          <SearchInput
            placeholder="Search for a tag"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onSubmit={handleSearchSubmit}
          />
          <SearchIcon onClick={handleSearchSubmit}>
            {loading ? (
              <TailSpin height="20" width="20" color="#fff" radius="1" />
            ) : (
              <Search />
            )}
          </SearchIcon>
        </SearchContainer>
      </HeaderContainer>
      {error ? (
        <Error message="There are no images with this tag. Search again" />
      ) : (
        <BodyContainer loading={imageLoading}>
          {imageLoading ? (
            <LoaderContainer>
              <TailSpin height="60" width="60" color="#9c9c9c" radius="1" />
            </LoaderContainer>
          ) : (
            <DndContainer>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                sensors={sensors}
              >
                <SortableContext
                  items={pictures}
                  strategy={rectSortingStrategy}
                >
                  <GridContainer>
                    <Grid container spacing={2}>
                      {pictures.map((picture, index) => (
                        <Grid item xs={6} md={4} lg={2} key={picture.id}>
                          <Item>
                            <MediaItem i={picture} />
                          </Item>
                        </Grid>
                      ))}
                    </Grid>
                  </GridContainer>
                </SortableContext>
              </DndContext>
            </DndContainer>
          )}
        </BodyContainer>
      )}
    </Container>
  );
};

export default Media;
