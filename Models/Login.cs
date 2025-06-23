namespace Sistema_comercial.Models
{
    public class Login
    {
        public required string Email { get; set; }

        public required string PasswordHash { get; set; }
    }
}
