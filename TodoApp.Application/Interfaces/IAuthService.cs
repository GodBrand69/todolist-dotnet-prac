namespace TodoApp.Application.Interfaces
{
    public interface IAuthService
    {
        string Authenticate(string username, string password);
        void Register(string username, string password);
    }
}