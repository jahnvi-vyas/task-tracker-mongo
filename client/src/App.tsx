import HeaderComponent from "./components/HeaderComponent";
import HeroSectionComponent from "./components/HeroSectionComponent";
import StatisticsComponent from "./components/StatisticsComponent";
import TasksSectionComponent from "./components/TasksSectionComponent";
import FooterComponent from "./components/FooterComponent";
import CreateTaskDrawerComponent from "./components/CreateTaskDrawerComponent";
import useTasks from "./hooks/useTasks";
import "./App.css";

const App = () => {
  const {
    tasks,
    filter,
    isLoading,
    error,
    isCreating,
    isCreateDrawerOpen,
    contextHolder,
    loadTasks,
    handleFilterChange,
    handleOpenCreateDrawer,
    handleCloseCreateDrawer,
    handleCreateTask,
    handleStatusChange,
    handleDeleteTask,
  } = useTasks();

  return (
    <div className="app">
      {contextHolder}
      <HeaderComponent />
      <main className="app-main">
        <HeroSectionComponent
          onCreateTask={handleOpenCreateDrawer}
        />
        <StatisticsComponent
          tasks={tasks}
        />
        <TasksSectionComponent
          tasks={tasks}
          filter={filter}
          isLoading={isLoading}
          error={error}
          onFilterChange={handleFilterChange}
          onRetry={() => void loadTasks(filter)}
          onCreateTask={handleOpenCreateDrawer}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteTask}
        />
      </main>
      <FooterComponent />
      <CreateTaskDrawerComponent
        open={isCreateDrawerOpen}
        loading={isCreating}
        onClose={handleCloseCreateDrawer}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};

export default App;